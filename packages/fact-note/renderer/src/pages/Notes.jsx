import { connect } from "react-redux";
import { mapStateToProps, router } from "../store/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FactNote from "@facts-kit/fact-note";

// Styled Components
const Container = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 777px;
  margin: auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InfoBlock = styled.div`
  background-color: #e6f7ff;
  border: 1px solid #99c2ff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-style: italic;
  color: #3366cc;
  margin: 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledLink = styled.a`
  color: #3366cc;
  text-decoration: underline;
  margin-left: 5px;
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  margin-bottom: 10px;
`;

const ClearButton = styled.button`
  padding: 10px;
  background-color: #ffd700; /* Use a shade of yellow */
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffcc00; /* Darker shade on hover */
  }
`;

function Feed({ tx, goToHome, goToNotes }) {
  const [txClone, setTx] = useState("");
  const [txInputValue, setTxInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (tx && tx.length === 43) setTx(tx);
  }, [tx]);

  const handleEnterClick = () => {
    setError(undefined);
    if (txInputValue?.length === 43) {
      goToNotes(txInputValue);
    } else {
      setError("Please enter a valid tx (43 characters).");
    }
  };

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!txClone && (
        <>
          <InputContainer>
            <Input
              type="text"
              value={txInputValue}
              onChange={(e) => setTxInputValue(e.target.value)}
              placeholder="Valid TXID"
            />
            <Button
              onClick={handleEnterClick}
              disabled={txInputValue?.length !== 43}
            >
              Enter
            </Button>
          </InputContainer>
        </>
      )}
      {txClone && (
        <>
          <InfoBlock>
            <InfoText>
              If a fact market note doesn't appear, it means the tx you entered
              doesn't have any fact markets attached.
              <StyledLink
                target="_blank"
                href={`https://facts.g8way.io/#/attach/${txClone}`}
              >
                Attach one
              </StyledLink>
              .
            </InfoText>
          </InfoBlock>

          <FactNote tx={txClone} />
          <ClearButton onClick={goToHome}>Clear</ClearButton>
        </>
      )}
    </Container>
  );
}

export default connect(mapStateToProps, router)(Feed);
