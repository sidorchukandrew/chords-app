import TeamsApi from '../api/teamsApi';

export function createTeam(team) {
  let params = {
    ...team,
    plan: 'Starter',
  };
  return TeamsApi.createOne(params);
}
