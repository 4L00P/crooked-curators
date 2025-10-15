// ribbon statuses
type RibbonStatus = 'BLUE' | 'WHITE' | 'RED' | 'FORGERIES';

// each individual artwork
export type Artwork = {
  id: string;
  source: string;
  status: string;
};

// containers for artworks
export type Ribbon = {
  id: RibbonStatus;
  color: string;
  description: string;
  points: number;
  source?: string;
};

// for canvas props
export type Canvas = {
  handleDone: () => void
}

// for round judging props
export type RoundJudging = {
  artworks: [];
  setArtworks: () => void;
  handleArtworks: () => void;
};

// for lock in judging button props
export type LockInJudging = {
  artworks: [];
  ribbons: [];
}

export type NavBar = {
  onClick: () => void
}
