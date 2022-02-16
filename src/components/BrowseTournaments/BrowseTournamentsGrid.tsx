import * as React from 'react';
import {
  DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridRenderCellParams,
} from '@mui/x-data-grid';
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
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

const bkgdColor = '#2F3241';
const theme = createTheme({
  components: {
    // Use `MuiDataGrid` on both DataGrid and DataGridPro
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-cell': {
            borderBottomColor: bkgdColor,
          },
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-colCell:focus-within,  & .MuiDataGrid-columnHeader:focus-within':
            {
              outline: 0,
            },
          '& .MuiDataGrid-columnsContainer': {
            borderBottomColor: bkgdColor,
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            color: '#FFF',
            fontSize: 'x-large',
          },
          backgroundColor: bkgdColor,
          borderColor: bkgdColor,
        },
      },
    },
  },
});

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function BrowseTournamentsGrid() {
  const [rowData, setRows] = useState<TournamentRow[]>([]);
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
