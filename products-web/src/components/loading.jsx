import { Loading } from "@nextui-org/react";
import SimpleMessageContainer from "./simpleMessageContainer";

export default function LoadingComponent() {
  return (
    <SimpleMessageContainer>
        <Loading type="points" />
    </SimpleMessageContainer>
  )
}
