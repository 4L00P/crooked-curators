import { Router } from 'express';

import { Game } from '../db/schemas/games';
import { Round } from '../db/schemas/rounds';
import { Artwork } from '../db/schemas/artworks';
import axios from 'axios';

export const artworkRouter = Router();

// post artworks to database by s3 get url
artworkRouter.post('/', ({ body, user }: any, res) => {

  // destructure body from request
  // const { body, user } = req;

  // destructure game code and image url from body
  const { gameCode, imageUrl } = body;

  // search db by game code to get the game id, then rounds with that game id
  Game.findOne({
    where: {
      gameCode: gameCode
    }
  })
    .then((game: any) => {

      const { id } = game;

      // find rounds by game id; sorting by most recent and limiting result to 1
      Round.findAll({
        where: {
          game_id: id,
        },
        limit: 1,
        order: [['createdAt', 'DESC']]
      })
        .then((round: any) => {

          // with most recent round id, add to artworks with round id, user id, and artwork url
          Artwork.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            artworkSrc: imageUrl,
            round_id: round[0].dataValues.id,
            artist_id: user.id,
            game_id: game.id
          })

        })
        .catch((err: any) => {
          console.error('Failed to find Rounds with Game ID: SERVER:', err);
        });
    })
    .catch((err: any) => {
      console.error('Failed to find Game with Game Code, adding Artwork: SERVER:', err);
    });
})

// retrieve artwork from database
artworkRouter.get('/judging/:gameCode', ({ params, user }, res) => {

  // get user and game code from request params
  const { gameCode } = params;

  // search db for game by code
  Game.findOne({
    where: {
      gameCode: gameCode
    }
  })
    .then((game: any) => {

      // grab game id and query for round with that id, filtering for most recent
      const { id } = game;

      Round.findAll({
        where: {
          game_id: id,
        },
        limit: 1,
        order: [['createdAt', 'DESC']]
      })
        .then((round: any) => {

          // get all artworks from that round via round id
          Artwork.findAll({
            where: {
              round_id: round[0].dataValues.id,
            },
            attributes: ['id', ['artworkSrc', 'source']]
          })
            .then(async (artworks: any) => {

              // map over artworks to add status of "FORGERIES" to each
              // make a request while having access to s3 link and await response, reassigning source to body: URI

              const allArtworks = await artworks.map(async ({ dataValues }: any) => {

                dataValues.status = 'FORGERIES';

                // make get request to each artwork's source s3 urls
                const source = dataValues.source;

                await axios.get(source)
                  .then(({ data }) => {
                    dataValues.source = data.body;
                  })

                return dataValues;
              });

              // send array of artwork uri's back
              Promise.all(allArtworks)
                .then((artworks) => res.json(artworks))
                .catch((err) => console.error('Failed to PROMISE ALL artwork requests: SERVER:', err))
            })
        })
        .catch((err: Error) => {
          console.error('Failed to find Round via Game ID: SERVER:', err);
        });
    })
    .catch((err: Error) => {
      console.error('Failed to find Game via Game Code: SERVER:', err);
    })
})

// updates artwork with ribbon awarded
artworkRouter.patch('/addRibbons', (req, res) => {

})

// gets all artworks with a ribbon for the ending game gallery
// currently will just pull ALL artworks from the game
artworkRouter.get('/gallery/:gameCode', ({ params }, res) => {

  // get game code from request params
  const { gameCode } = params;

  // find game by game code
  Game.findOne({
    where: {
      gameCode: gameCode
    }
  })
    .then((game: any) => {

      // grab game id and query for artworks with that id
      const { id } = game;

      // search artworks with matching round ids & ribbon !== null
      Artwork.findAll({
        where: {
          game_id: id
        }
      })
        .then(async (artworks: any) => {


          // map over all artworks to make requests to get image URIs
          const allArtworks = await artworks.map(async ({ dataValues }: any) => {

            // make get request to each artwork's source s3 urls
            const source = dataValues.artworkSrc;
            await axios.get(source)
              .then(({ data }) => {
                dataValues.source = data.body;
              })

            return dataValues;
          });

          // promise all artworks to complete requests
          Promise.all(allArtworks)
            // send array of artwork uri's back
            .then((artworks) => res.json(artworks))
            .catch((err: Error) => console.error('Failed to PROMISE ALL artwork requests: SERVER:', err))

        })
    })
    .catch((err: Error) => {
      console.error('Failed to find Game via Game Code: SERVER:', err);
    })
})

artworkRouter.patch('/ribbons', ({ body }, res) => {

  // pull artworks and ribbons from the body of the req
  const { artworks, ribbons } = body;

  // console.log(ribbons);

  const blueRibbon = ribbons.filter((ribbon: any) => ribbon.color === 'BLUE')[0];
  const whiteRibbon = ribbons.filter((ribbon: any) => ribbon.color === 'WHITE')[0];
  const redRibbon = ribbons.filter((ribbon: any) => ribbon.color === 'RED')[0];

  // get matching artwork and ribbon
  const artworksRibbons = artworks.reduce((acc: any, artwork: any) => {

    // object to return to the array
    const obj = {
      artworkId: 0,
      ribbonId: 0
    };

    if(artwork.status === 'BLUE'){
      obj['artworkId'] = artwork.id;
      obj['ribbonId'] = blueRibbon.id;
    } else if(artwork.status === 'WHITE'){
      obj['artworkId'] = artwork.id;
      obj['ribbonId'] = whiteRibbon.id;
    } else if(artwork.status === 'RED'){
      obj['artworkId'] = artwork.id;
      obj['ribbonId'] = redRibbon.id;
    }

    acc.push(obj);

    return acc;
  }, [])

  console.log(artworksRibbons);

  // update db with artwork and ribbon
  artworksRibbons.forEach((artworkRibbon: any) => {
    Artwork.update({
      ribbon_id: artworkRibbon.ribbonId
    }, {
      where: {
        id: artworkRibbon.artworkId
      }
    })
      .then(() => {
        console.log('Successful PATCH for Artwork with Ribbon awarded.')
      })
      .catch((err: Error) => {
        console.error('Failed to PATCH Artwork with Ribbon awarded: SERVER:', err);
      })
  })
})
