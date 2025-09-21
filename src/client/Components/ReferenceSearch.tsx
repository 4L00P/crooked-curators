// Search that sends request to server for server to request to the API for the keyword searched

import React from 'react'

import { Input } from '../antdComponents'
import type { GetProps } from '../antdComponents';

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => value;

const ReferenceSearch = ({ handleSearch }) => {
  return (
    <>
      <Search 
      placeholder='Some fine art'
      allowClear
      enterButton="Search"
      size="large"
      onSearch={(...args)=>{
        handleSearch(onSearch(...args))
      }}
      />
    </>
  )
};

export default ReferenceSearch;