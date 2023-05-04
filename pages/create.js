import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWRMutation from "swr/mutation";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    console.error(response.status);
  }
}

export default function CreatePlacePage() {
  const { trigger } = useSWRMutation("/api/places", sendRequest);

  async function addPlace(place) {
    // event.preventDefault();
    // const formData = new FormData(event.target);
    // const placeData = Object.fromEntries(formData);
    // console.log(placeData);

    await trigger(place);

    // event.target.reset();

    // console.log("Place added (but not really...)");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
