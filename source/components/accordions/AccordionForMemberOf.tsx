import React, { useRef } from "react";
import { removeUserFromATeam } from "../../server/axiosRequests/requests";
import { LeaderAndMemberOfProps, User } from "../../server/mongoDB/schemas";
import AlertDialog from "../AlertDialog";
import {
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  ContenWrapper,
  StyledChevron,
} from "../UsersTeamInfo";

interface AccordionMemberOfProps {
  teamsUserIsAPartOf: LeaderAndMemberOfProps[];
  currentUser: User;
  removeUserFromTeam: (
    teams: LeaderAndMemberOfProps[],
    idNumber: number
  ) => void;
}

const AccordionForMemberOf: React.FC<AccordionMemberOfProps> = ({
  teamsUserIsAPartOf,
  currentUser,
  removeUserFromTeam,
}): JSX.Element => {
  const ref = useRef(null);

  const handleUnsubscribe = async (teamId: string, idNumber: number) => {
    try {
      await removeUserFromATeam(currentUser.userId, teamId);
      removeUserFromTeam(teamsUserIsAPartOf, idNumber);
      ref.current.remove();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AccordionContainer>
      {teamsUserIsAPartOf.map((team, key) => (
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
                <>Team ID: {team.teamId}</>
                <AlertDialog
                  handleUnsubscribe={handleUnsubscribe}
                  teamId={team.teamId}
                  buttonName={"Leave team"}
                  idNumber={key}
                >
                  Unsubscribe
                </AlertDialog>
              </ContenWrapper>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      ))}
    </AccordionContainer>
  );
};

export default AccordionForMemberOf;
