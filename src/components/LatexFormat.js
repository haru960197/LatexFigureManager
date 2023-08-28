import { Text, Textarea, Box, Button, HStack } from "@chakra-ui/react";

export const LatexFormat = ({ newFileInfo }) => {
    const { object, caption, label } = newFileInfo;
    const fileName = object.name;
    const content = fileName && caption && label
    ?
`\\begin{figure}[H]
    \\centering
    \\includegraphics[width=\\textwidth]{pic/${fileName}}
    \\caption{${caption}}
    \\label{${label}}
\\end{figure}`
    : '';

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(content);
            console.log("Copied successfully");
        } catch {
            console.error("Failed to copy");
        }
    };

    return (
        <>
            <Text htmlFor="latex" as="u" >Latex書式</Text>

            <Box mt={1} bg="blackAlpha.700">
                <Textarea
                    id="latex"
                    cols="65"
                    rows="6"
                    color="teal.200"
                    resize="none"
                    value={content}
                />
            </Box>
            <Button colorScheme='teal' mt={2} onClick={handleCopyClick} >コピー</Button>
        </>
    );
};