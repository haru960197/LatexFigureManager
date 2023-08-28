import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "gray.100",
                color: "white.800",
            },
            p: {
                fontSize: { base: "md", md: "lg"},
                lineHeight: "tall"
            }
        }
    }
});

export default theme;