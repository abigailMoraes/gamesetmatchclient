import * as React from 'react';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridRowParams, GridRenderCellParams } from '@mui/x-data-grid';
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import BrowseTournamentCard, { Tournament } from './BrowseTournamentCard';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';


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
    renderCell:(params: GridRenderCellParams<any>) => <BrowseTournamentCard tournament={params.value} />
  },
];

const rows: TournamentRow[] = [
  {
    id: 1,
    name: 'Ping Pong Tournament',
    description: 'Some fun ping pong games',
    location: 'Lounge',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 1,
      name: 'Ping Pong Tournament',
      description: 'Some fun ping pong games',
      startDate: new Date(),
      location: 'Lounge',
      maxParticipants: 10,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
  },
  {
    id: 2,
    name: 'Mario Kart',
    description: 'Some fun ping pong games',
    location: 'Lounge',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 2,
      name: 'Mario Kart',
      description: 'Racing',
      startDate: new Date(),
      location: 'Zoom',
      maxParticipants: 10,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
  },
  {
    id: 3,
    name: '3x3 Basketball R.R.',
    description: 'Ball',
    location: 'Zoom',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 3,
      name: '3x3 Basketball R.R.',
      description: 'Ball',
      startDate: new Date(),
      location: 'Zoom',
      maxParticipants: 10,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
  },
  {
    id: 4,
    name: 'Rock, Paper, Scissors',
    description: 'Ready set match',
    location: 'Zoom',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 4,
      name: 'Rock, Paper, Scissors',
      description: 'Ready set match',
      startDate: new Date(),
      location: 'Zoom',
      maxParticipants: 10,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
  },
  {
    id: 5,
    name: 'League of Legends',
    description:'Computer games',
    location: 'Zoom',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 5,
      name: 'League of Legends',
      description: 'Computer games',
      startDate: new Date(),
      location: 'Zoom',
      maxParticipants: 10,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
  },
  {
    id: 6,
    name: 'Tetris tourney',
    description: 'Tetris tourney',
    location: 'Zoom',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 6,
      name: 'Tetris tourney',
      description: 'tetris.io',
      startDate: new Date(),
      location: 'Zoom',
      maxParticipants: 20,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration:30,
      numberOfMatches: 3,
    }
  },
  {
    id: 7,
    name: 'Mini Golf',
    description: 'outdoor mini golf',
    location: '123 Mini Golf',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 7,
      name: 'Mini Golf',
      description: 'outdoor mini golf',
      startDate: new Date(),
      location: '123 Mini Golf',
      maxParticipants: 30,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
  },
  {
    id: 8,
    name: 'Trivia',
    description: 'Test your knowledge',
    location: 'Zoom',
    startDate: new Date(),
    closeRegistrationDate: new Date(),
    allTournamentDetails: {
      tournamentId: 8,
      name: 'Trivia',
      description: 'Test your knowledge',
      startDate: new Date(),
      location: 'Zoom',
      maxParticipants: 25,
      prize: 'Coffee',
      format: 'Round-robin',
      type: 'Random',
      closeRegistrationDate: new Date(),
      matchDuration: 30,
      numberOfMatches: 3,
    }
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
          '& .MuiDataGrid-columnHeaderTitleContainer' :{
            color: '#FFF',
            fontSize: 'x-large',
          },
          backgroundColor:bkgdColor,
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
  return (
    <ThemeProvider theme={theme}>
      <DataGrid
      components={{ Toolbar: CustomToolbar }}
      isRowSelectable={(params: GridRowParams) => false}
      autoHeight
      rows={rows}
      columns={columns}
      rowHeight={200}
      />
      </ThemeProvider>
  );
}
