import TeamsApi from '../api/teamsApi';

export function createTeam(team) {
  let params = {
    ...team,
    plan: 'Starter',
  };
  return TeamsApi.createOne(params);
}

export function getAllTeams() {
  return TeamsApi.getAll();
}
