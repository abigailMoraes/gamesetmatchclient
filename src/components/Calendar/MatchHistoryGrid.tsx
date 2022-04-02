import * as React from 'react';
import {
  DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridRenderCellParams,
} from '@mui/x-data-grid';
// When using TypeScript 4.x and above
import { ThemeProvider } from '@emotion/react';
import { createTheme, Theme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { useAtomValue } from 'jotai';
import MatchHistoryCard from './MatchHistoryCard';
import { userIDAtom } from '../../atoms/userAtom';
import MatchService from './MatchService';
import { Match } from './MatchInterface';

export interface MatchHistoryRow {
  id: number,
  startTime: Date,
  endTime: Date,
  duration: number,
  type: String,
  name: String,
  location: String,
  description: String,
  allMatchDetails: Match
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    hide: true,
    sortable: false,
  },
  {
    field: 'startTime',
    headerName: 'Start Time',
    hide: true,
  },
  {
    field: 'endTime',
    headerName: 'End Time',
    hide: true,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    hide: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    hide: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    hide: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    hide: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    hide: true,
  },
  {
    field: 'allMatchDetails',
    headerName: 'Match History',
    hide: false,
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<any>) => <MatchHistoryCard match={params.value} />,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function MatchHistoryGrid() {
  const [rowData, setRows] = useState<MatchHistoryRow[]>([]);
  const mainTheme = useTheme() as Theme;
  //const userID = useAtomValue(userIDAtom);
  const userID = useAtomValue(userIDAtom);
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

  useEffect(() => {
    MatchService.getPastMatches(userID).then((data) => setRows(data));
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
