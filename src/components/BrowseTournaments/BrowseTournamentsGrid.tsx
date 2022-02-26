import * as React from 'react';
import {
  DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridRenderCellParams,
} from '@mui/x-data-grid';
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import BrowseTournamentCard, { Tournament } from './BrowseTournamentCard';
import TournamentService from './TournamentsService';

export interface TournamentRow {
  id: Number,
  name: String,
  description: String,
  location: String,
  startDate: Date,
  closeRegistrationDate: Date,
  allTournamentDetails: Tournament
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    hide: true,
    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    hide: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    hide: true,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    type: 'number',
    hide: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    hide: true,
  },
  {
    field: 'closeRegistrationDate',
    headerName: 'Registration Closing Date',
    hide: true,
  },
  {
    field: 'allTournamentDetails',
    headerName: 'Upcoming Tournaments',
    hide: false,
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    // eslint-disable-next-line max-len
    renderCell: (params: GridRenderCellParams<any>) => <BrowseTournamentCard tournament={params.value} />,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function BrowseTournamentsGrid() {
  const [rowData, setRows] = useState<TournamentRow[]>([]);
  const mainTheme = useTheme() as Theme;

  const theme = createTheme(mainTheme, {
    components: {
      // Use `MuiDataGrid` on both DataGrid and DataGridPro
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-toolbarContainer button': {
              color: mainTheme.palette.primary.contrastText,
            },
            '& .MuiDataGrid-cell': {
              borderBottomColor: mainTheme.palette.primary.main,
            },
            '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-colCell:focus-within,  & .MuiDataGrid-columnHeader:focus-within':
              {
                outline: 0,
              },
            '& .MuiDataGrid-columnsContainer': {
              borderBottomColor: mainTheme.palette.primary.main,
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              color: mainTheme.palette.primary.contrastText,
              fontSize: 'x-large',
            },
            backgroundColor: mainTheme.palette.primary.main,
            borderColor: mainTheme.palette.primary.main,
          },
        },
      },
    },
  });

  useEffect(() => {
    TournamentService.getAll()
      .then((data) => setRows(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        components={{ Toolbar: CustomToolbar }}
        isRowSelectable={() => false}
        autoHeight
        rows={rowData}
        columns={columns}
        rowHeight={200}
      />
    </ThemeProvider>
  );
}
