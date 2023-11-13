import React, { useEffect, useState } from "react";
import { getFactMarkets } from "./get-fact-markets";
import styled from "styled-components";

const NotesContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NotesHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-style: italic;
  font-weight: 300; /* Use a slimmer font weight */
  color: #333;
`;

const NotesContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  display: flex;
  align-items: center;

  > p {
    margin-right: 10px; /* Adjust the spacing between description and link */
  }
`;

const OtherUsersMessage = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #888;
  margin-top: 10px;
`;

const ToggleLink = styled.a`
  cursor: pointer;
  color: #3498db;
  text-decoration: underline;
  margin-top: 10px;
  display: block;
`;

const ReadMoreLink = styled.a`
  cursor: pointer;
  color: #666;
  text-decoration: underline;
`;

export const FactNote = ({ tx, transaction }) => {
  const [dataClone, setData] = useState();
  const [description, setDescription] = useState();
  const [noteTx, setNoteTx] = useState();
  const [error, setError] = useState();
  const [isContentVisible, setContentVisibility] = useState(true);

  useEffect(() => {
    if (transaction) return setData(transaction);

    const fetchData = () => {
      if (!error && !tx && !transaction)
        return setError("Please pass a tx or a transaction.");

      if (!error && !dataClone && transaction) return setData(transaction);

      if (!error && !transaction && tx) {
        getFactMarkets(tx)
          .then((data) => {
            setNoteTx(data[0].id);
            const desc = data[0].tags.find((tag) => tag.name === "Description");
            setDescription(desc.value || "Something went wrong.");
            setData(data);
          })
          .catch((e) => setError(e.message));
      }
    };

    fetchData();
  }, [tx, error]);

  if (error) return <p>{error}</p>;

  const handleToggleContent = () => {
    setContentVisibility(!isContentVisible);
  };

  return (
    <NotesContainer>
      <NotesHeader>
        Fact Market Notes {dataClone && <span>({dataClone.length})</span>}
      </NotesHeader>
      <OtherUsersMessage>
        Other Permaweb users added their thoughts.
      </OtherUsersMessage>
      {isContentVisible && (
        <NotesContent>
          <p>{description}</p>
          <ReadMoreLink
            href={`https://facts.g8way.io/#/fact/${noteTx}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            read more
          </ReadMoreLink>
        </NotesContent>
      )}

      <ToggleLink onClick={handleToggleContent}>
        {isContentVisible ? "Hide" : "Show"} Note
      </ToggleLink>
    </NotesContainer>
  );
};

export default FactNote;
