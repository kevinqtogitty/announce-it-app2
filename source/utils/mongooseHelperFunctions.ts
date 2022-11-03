export const uniqueIdGenerator = (): number => {
  return Math.floor(Math.random() * Date.now());
};

//Check if user is trying tp join a team they are already a part of
export const checkIfUserIsAlreadyPartOfTeam = <T>(
  memberOf: [],
  teamToJoin: T
): boolean => {
  if (memberOf.find((teamId: string) => teamId === teamToJoin)) return true;
  return false;
};

//Check if a team already exists
export const checkIfTheTeamAlreadyExists = <T>(
  entryUpdated: { leaderOf: [{ teamName: string }] },
  teamToCreate: T
): boolean => {
  if (
    entryUpdated.leaderOf.find(
      (team: { teamName: string }) => team.teamName === teamToCreate
    )
  )
    return true;
  return false;
};
