import React, { useRef } from "react";
import { deleteATeam } from "../../server/axiosRequests/requests";
import { TeamProps, User } from "../../server/mongoDB/schemas";
import AlertDialog from "../AlertDialog";
import {
  AccordionRoot,
  StyledChevron,
  ContenWrapper,
  AccordionContainer,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "../UsersTeamInfo";

interface AccordionLeaderOfProps {
  setTeamsUserCreated: React.Dispatch<React.SetStateAction<TeamProps[]>>;
  teamsUserCreated: TeamProps[];
  currentUser: User;
}

const AccordionForLeaderOf: React.FC<AccordionLeaderOfProps> = ({
  setTeamsUserCreated,
  teamsUserCreated,
  currentUser,
}): JSX.Element => {
  const ref = useRef(null);

  const handleDissolveTeam = async (teamId: string, idNumber: number) => {
    try {
      await deleteATeam(currentUser.userId, teamId);
      setTeamsUserCreated((state) => state.splice(idNumber, 1));
      ref.current.remove();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AccordionContainer>
      {teamsUserCreated.map((team, key) => (
        <AccordionRoot key={key} type="multiple" ref={ref}>
          <AccordionItem value={team.teamId}>
            <AccordionHeader>
              {team.teamName}
              <AccordionTrigger>
                <StyledChevron />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <ContenWrapper>
                <>
                  Team ID: {team.teamId}
                  <br />
                  Members: {team.teamMembers?.length}
                </>
                <AlertDialog
                  handleDissolveTeam={handleDissolveTeam}
                  teamId={team.teamId}
                  switchKey={1}
                  buttonName={"Dissolve Team"}
                  idNumber={key}
                >
                  Dissolve team
                </AlertDialog>
              </ContenWrapper>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      ))}
    </AccordionContainer>
  );
};

export default AccordionForLeaderOf;
