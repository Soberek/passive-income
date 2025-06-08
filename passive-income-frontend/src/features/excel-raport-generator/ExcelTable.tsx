import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { ProgramsData } from "./useExcelUploader";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const TypeNameHeader = ({ program_type }: { program_type: string }) => {
  return (
    <Grid size={12} mb={1} mt={3}>
      <Item
        sx={{
          padding: 0.3,
          textAlign: "start",
          paddingLeft: 1,
          color: "black",
          fontWeight: "bold",
          border: 1,
          fontSize: 20,
        }}
      >
        {program_type}
      </Item>
    </Grid>
  );
};

export default function ExcelTable(data: ProgramsData) {
  return (
    <Grid key={1} container>
      {Object.entries(data).map(([program_type, program_names]) => (
        <>
          <TypeNameHeader program_type={program_type} />

          <Grid size={6}>
            <Item
              sx={{
                paddingY: 0.5,
                textAlign: "start",
                paddingLeft: 1,
                color: "black",
                fontWeight: "bold",
                border: 1,
                fontSize: 16,
              }}
            >
              Działanie
            </Item>
          </Grid>
          <Grid size={3}>
            <Item
              sx={{
                padding: 0.5,
                textAlign: "start",
                paddingLeft: 1,
                color: "black",
                fontWeight: "bold",
                border: 1,
                fontSize: 16,
              }}
            >
              👩‍🏫 Liczba działań{" "}
            </Item>
          </Grid>
          <Grid size={3}>
            <Item
              sx={{
                padding: 0.5,
                textAlign: "start",
                paddingLeft: 1,
                color: "black",
                fontWeight: "bold",
                border: 1,
                fontSize: 16,
              }}
            >
              👨‍👩‍👧‍👦 Liczba odbiorców{" "}
            </Item>
          </Grid>

          {Object.entries(program_names).map(([program_name, action_names], program_name_index) => (
            <>
              <Grid size={12}>
                <Item
                  sx={{ padding: 0, textAlign: "start", paddingLeft: 1, color: "black", fontWeight: "bold", border: 1 }}
                >
                  {++program_name_index}. {program_name}
                </Item>
              </Grid>

              {Object.entries(action_names).map(([action_name, counter], action_index) => (
                <>
                  <Grid size={6}>
                    <Item
                      sx={{
                        padding: 0,
                        textAlign: "start",
                        paddingLeft: 1,
                        color: "black",
                        fontWeight: "md",
                        border: 1,
                      }}
                    >
                      {program_name_index}.{++action_index}. {action_name}
                    </Item>
                  </Grid>
                  <Grid size={3}>
                    <Item
                      sx={{
                        padding: 0,
                        textAlign: "start",
                        paddingLeft: 1,
                        color: "black",
                        fontWeight: "md",
                        border: 1,
                      }}
                    >
                      {counter.action_number}
                    </Item>
                  </Grid>
                  <Grid size={3}>
                    <Item
                      sx={{
                        padding: 0,
                        textAlign: "start",
                        paddingLeft: 1,
                        color: "black",
                        fontWeight: "md",
                        border: 1,
                      }}
                    >
                      {counter.people}
                    </Item>
                  </Grid>
                </>
              ))}
            </>
          ))}
        </>
      ))}
    </Grid>
  );
}
