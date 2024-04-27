/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { debounce } from 'lodash';
import {
  StyledButtonClear,
  StyledSearchButton,
  StyledSearchInput,
  StyledSearchWrapper,
} from '.';
import { Divider, InputAdornment } from '@mui/material';
import { useSearchContext } from '../../hooks/useSearchContext';

export const Search: React.FC = () => {
  const {
    isSearchOpen,
    query,
    setIsSearchOpen,
    setQuery,
    handleSearchIconClick,
    handleChangeQuery,
    handleClearSearch,
  } = useSearchContext();

  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const applyQuery = useCallback(debounce(setQuery, 1000), []);

  useEffect(() => {
    applyQuery(query);
  }, [query, applyQuery]);

  useEffect(() => {
    setIsSearchOpen(false);
    setQuery('');
  }, [pathname, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <StyledSearchWrapper
      sx={({ breakpoints }) => ({
        [breakpoints.down('sm')]: {
          position: isSearchOpen && 'absolute',
          left: isSearchOpen && '0',
          height: isSearchOpen ? '32px' : '100%',
          width: isSearchOpen ? '60vw' : '48px',
          fontSize: isSearchOpen && '12px',
          zIndex: isSearchOpen && '2',
        },
      })}
    >
      {isSearchOpen && (
        <>
          <StyledSearchInput
            placeholder={`Search in ${pathname.slice(1)}...`}
            value={query}
            onChange={handleChangeQuery}
            inputRef={inputRef}
            sx={({ palette }) => ({
              color: palette.primary.main,
            })}
            endAdornment={
              !!query.length && (
                <InputAdornment
                  sx={{
                    cursor: 'pointer',
                    margin: 0,
                    maxHeight: 'none',
                    scale: '1',
                    transition: 'scale 300ms',

                    '&:hover': {
                      scale: '1.1',
                    },
                  }}
                  position="end"
                >
                  <StyledButtonClear disableRipple onClick={handleClearSearch}>
                    <ClearIcon
                      color="red"
                      sx={{ width: '16px', height: '16px' }}
                    />
                  </StyledButtonClear>
                </InputAdornment>
              )
            }
          />
        </>
      )}

      {isSearchOpen ? (
        <StyledSearchButton
          aria-label="clear search"
          onClick={() => {
            handleClearSearch();
            setIsSearchOpen(false);
          }}
        >
          <SearchOffIcon color="primary" />
        </StyledSearchButton>
      ) : (
        <>
          <Divider
            orientation="vertical"
            sx={({ breakpoints, palette }) => ({
              backgroundColor: palette.element.main,
              height: '64px',
              [breakpoints.down('md')]: {
                height: '48px',
              },
            })}
          />
          <StyledSearchButton
            aria-label="search"
            onClick={handleSearchIconClick}
          >
            <SearchIcon color="primary" />
          </StyledSearchButton>
        </>
      )}
    </StyledSearchWrapper>
  );
};
