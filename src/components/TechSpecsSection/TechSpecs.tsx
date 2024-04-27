import React from 'react';
import { ProductExpanded } from '../../types';
import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

interface TechSpecsProps {
  product: ProductExpanded;
}

interface Row {
  name: string;
  stringValue: string;
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ product }) => {
  const productSpecs = {
    screen: product.screen,
    resolution: product.resolution,
    processor: product.processor,
    ram: product.ram,
    capacity: product.capacity,
    camera: product.camera,
    zoom: product.zoom,
    cell: product.cell,
  };

  const createRow = (name: string, value: string | string[]): Row => {
    let stringValue = '';

    if (Array.isArray(value)) {
      stringValue = value.join(', ');
    } else {
      stringValue = value;
    }

    return { name, stringValue };
  };

  const rows = Object.entries(productSpecs).reduce((accum, [key, value]) => {
    if (value) {
      accum.push(createRow(key, value));
    }

    return accum;
  }, [] as Row[]);

  return (
    <Stack sx={{ flex: 1 }} spacing={4}>
      <Stack spacing={2}>
        <Typography variant="h3" color="primary">
          Tech specs
        </Typography>
        <Divider />
      </Stack>
      <Table>
        <TableBody>
          {rows.map(row => {
            const { name } = row;
            const capitilizedName =
              name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <TableRow
                key={name}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: '8px',
                  '&:first-child': {
                    mt: 0,
                  },
                }}
              >
                {Object.values(row).map((cellName, index) => {
                  if (index === 0) {
                    return (
                      <TableCell
                        key={name}
                        component="th"
                        scope="row"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: 'none',
                          padding: 0,
                          paddingRight: '10px',
                          fontWeight: '500',
                        }}
                      >
                        <Typography color="secondary">
                          {capitilizedName}
                        </Typography>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={`${name}-${index}`}
                      sx={{
                        border: 'none',
                        padding: 0,
                        fontWeight: '500',
                      }}
                      align="right"
                    >
                      <Typography color="primary">{cellName}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Stack>
  );
};
