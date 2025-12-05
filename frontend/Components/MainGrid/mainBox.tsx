import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const MainBox = () => {

    return(
        <Container maxWidth="lg" sx={{background:"red", height:"70vh"}}>
            {/*Definerar områden för Själva Cirklarna grid och allt annat */}
            <Grid container spacing={0} sx={{alignItems: "center"}}>
                <Grid size={8} maxWidth="lg" sx={{background:"yellow",height:"70vh"}}>
                    {/* Den delen innehåller själva området för spelet */}
                </Grid>
                <Grid size={4} sx={{background:"blue", height:"70vh"}}>
                    {/* Deb delen innehåller området för hjälpmedel */}
                    <Grid container sx={{alignItems:"center"}}>
                        <Grid size={12} sx={{background:"green"}}>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default MainBox;