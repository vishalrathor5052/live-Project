import { Theme, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';

type CreateSXType = <T extends Record<string, SxProps<Theme>>>(sx: T) => T;

export const createSX: CreateSXType = sx => sx;

type CreateThemedStyleType = <T extends Record<string, CSSProperties>>(
  styleFn: (theme: Theme) => T,
) => () => T;

export const createThemedStyle: CreateThemedStyleType = styleFn => {
  return function useThemedStyle() {
    const theme = useTheme();
    return styleFn(theme);
  };
};

export const combineStyles = (...styles: SxProps<Theme>[]): SxProps<Theme> =>
  Object.assign({}, styles) as SxProps<Theme>;
