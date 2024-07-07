import { Cross1Icon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import IconButton from "./IconButton";

type SlideScreenProps = {
  isSlideScreenOpen?: boolean;
  openSlideScreen: (value: boolean) => void;
  formTitle: string;
  formDescription?: string;
  FormContent: React.ReactNode;
};

function SlideScreen({
  isSlideScreenOpen = false,
  openSlideScreen,
  formTitle,
  formDescription,
  FormContent,
}: SlideScreenProps) {
  return (
    <>
      <Box
        id="slide-screen"
        className={isSlideScreenOpen ? "slide-screen-open" : ""}
      >
        <Flex width="100%" justify="end">
          <IconButton radius="small" variant="soft">
            <Cross1Icon onClick={() => openSlideScreen(false)} />
          </IconButton>
        </Flex>
        <Flex
          direction="column"
          justify="between"
          align="start"
          gap="5"
          style={{ width: "100%" }}
        >
          <Text as="p" size="7">
            {formTitle}
            {formDescription && (
              <Text
                as="span"
                size="2"
                style={{ color: "var(--secondary-light)" }}
              >
                {formDescription}
              </Text>
            )}
          </Text>
          {FormContent}
        </Flex>
      </Box>
    </>
  );
}

export default SlideScreen;

