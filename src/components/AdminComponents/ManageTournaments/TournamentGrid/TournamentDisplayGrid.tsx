import * as React from 'react';
import {
  DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridRenderCellParams,
} from '@mui/x-data-grid';
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import GridCardOpenForRegistration from './GridCardOpenForRegistration';
import GridCardOngoing from './GridCardOngoing';
import { GridCardTypes } from '../ManageTournamentsEnums';
import { Tournament } from '../../../../interfaces/TournamentInterface';
import GridCardManageSchedule from './GridCardManageSchedule';

export interface TournamentRow {
  id: Number,
  name: String,
  description: String,
  location: String,
  startDate: Date,
  closeRegistrationDate: Date,
  allTournamentDetails: Tournament
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

interface TournamentDisplayGridProps {
  formTournament:Tournament | undefined,
  setFormTournament:(arg0:Tournament | undefined) => void,
  gridTitle:string,
  tournaments: TournamentRow[],
  gridCardComponentName:GridCardTypes,
}
export default function TournamentDisplayGrid({
  formTournament, setFormTournament, gridTitle, tournaments, gridCardComponentName,
}: TournamentDisplayGridProps) {
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
      type: 'date',
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
      type: 'date',
      hide: true,
    },
    {
      field: 'allTournamentDetails',
      headerName: gridTitle,
      hide: false,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any>) => {
        switch (gridCardComponentName) {
          case GridCardTypes.OpenForRegistration:
            return (
              <GridCardOpenForRegistration
                tournament={params.value}
                formTournament={formTournament}
                setFormTournament={setFormTournament}
              />
            );
          case GridCardTypes.ManageSchedule:
            return (
              <GridCardManageSchedule
                tournament={params.value}
                formTournament={formTournament}
                setFormTournament={setFormTournament}
              />
            );
          default:
            return (
              <GridCardOngoing
                tournament={params.value}
                formTournament={formTournament}
                setFormTournament={setFormTournament}
              />
            );
        }
      },
    },
  ];

  return (
    <Grid container maxWidth="md">
      <ThemeProvider theme={theme}>
        <div style={{ height: '100vh', width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                components={{ Toolbar: CustomToolbar }}
                isRowSelectable={() => false}
                rows={tournaments}
                columns={columns}
                rowHeight={200}
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Grid>
  );
}
