import React from 'react'
import { Box, InputBase } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(() =>
  createStyles({
    searchIconDiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        opacity: 0.5
      }
    },
    searchContainer: {
      borderRadius: '80px',
      position: 'relative',
      height: '40px',
      paddingLeft: '20px',
      width: '100%',
      minWidth: '300px',
      maxWidth: '900px',
      alignItems: 'center',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-between'
    },
    searchInput: {
      width: '100%',
      marginLeft: '5px'
    },
    searchIcon: {
      marginRight: '15px',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.2)'
      }
    }
  }),
);

const SearchComponent = ({color, bgcolor, border, height, value, handleChange, handleIconClick}) => {
  
  const classes = useStyles();

  return (
      <Box className={classes.searchContainer} style={{background: bgcolor, border: `1px solid ${border}`, height: height}}>
        <InputBase 
          className={classes.searchInput} 
          style={{color: color}} 
          placeholder={'Please input keyword to load images'}
          value={value ?? ''}
          onChange={handleChange}
        />
        <div onClick={handleIconClick} className={classes.searchIconDiv}>
          <SearchIcon className={classes.searchIcon} style={{color: color}}/>
        </div>
      </Box>
  )
}

export default SearchComponent;