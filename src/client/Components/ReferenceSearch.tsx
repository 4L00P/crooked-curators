// Search that sends request to server for server to request to the API for the keyword searched

import React from 'react'

import { Input } from '../antdComponents'
import type { GetProps } from '../antdComponents';

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => value;

const ReferenceSearch = ({ handleSearch, disabled }) => {
  return (
    <>
      <Search 
        placeholder='Enter a keyword'
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(...args)=>{
          handleSearch(onSearch(...args))
        }}
        disabled={disabled}
        style={{
          marginTop: 20
        }}
      />
    </>
  )
};

export default ReferenceSearch;