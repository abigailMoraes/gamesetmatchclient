import * as React from 'react';
import {
  DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridRenderCellParams,
} from '@mui/x-data-grid';
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Theme } from '@mui/material/styles';
import { useState } from 'react';
import { useTheme } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import BrowseTournamentCard from './BrowseTournamentCard';
import TournamentService, { Tournament } from './TournamentsService';

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
  const [loading, setLoading] = useState(true);
  const mainTheme = useTheme() as Theme;

  const theme = createTheme(mainTheme, {
    components: {
      // Use `MuiDataGrid` on both DataGrid and DataGridPro
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-toolbarContainer button': {
              color: mainTheme.palette.text.secondary,
            },
            '& .MuiTablePagination': {
              color: mainTheme.palette.text.secondary,
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
              fontSize: 'x-large',
            },
            backgroundColor: mainTheme.palette.primary.main,
            borderColor: mainTheme.palette.primary.main,
          },
        },
      },
    },
  });

  // TODO: fix this so it only gets called once, move to parent and only pass data?
  React.useEffect(() => {
    TournamentService.getAll()
      .then((data) => {
        setLoading(false);
        setRows(data);
      });
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? <CircularProgress /> : (
        <DataGrid
          components={{ Toolbar: CustomToolbar }}
          isRowSelectable={() => false}
          autoHeight
          rows={rowData}
          columns={columns}
          rowHeight={200}
        />
      )}
    </ThemeProvider>
  );
}
