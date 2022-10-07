import { TableContainer,Table,TableBody,TableRow,TableCell, TableHead, Pagination, Box, Typography} from "@mui/material";
import { data } from "../fakeData";
import usePagination from "../components/Pagination";
import { useState } from "react";

function Tablee () {


const columns = ["ID", "Borrower", "Campaign Name", "Campaign Type"];
let [page, setPage] = useState(1);
const PER_PAGE = 3;

const classes = ''
const count = Math.ceil(data.length / PER_PAGE);
const _DATA = usePagination(data, PER_PAGE);

const handleChange = (e, p) => {
  setPage(p);
  _DATA.jump(p);
};


return (
 <div>

 <Box display="flex" flexDirection="column" flex={1}>
        <Box display="flex" flexDirection="column" flex={1}>
          <TableContainer className={classes.container} >
            <Table size="small">
                <TableHead style={{borderColor:'none'}} >
                    <TableRow  >
                        {columns.map(column => (
                                <TableCell  key={column} className={classes.cell} >
                                <Typography component={"div"} variant="h6"> {column} </Typography>
                                </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* <Paper   className={classes.paper}>             */}
                  <TableBody>
                    {_DATA.currentData().map(dataRow => {
                      return (
                        <TableRow
                          key={dataRow.id}
                          title="tableRow"
                          
                          classes={{ hover: classes.hover }}
                          hover
                        >
                              <TableCell  align="left" >
                            {dataRow.id}
                          </TableCell>
                          <TableCell >
                            {dataRow.first_name}
                          </TableCell>
                          <TableCell  align="left" >
                            {dataRow.last_name}
                          </TableCell>
                          <TableCell align="left" >
                            {dataRow.email_address}
                          </TableCell>
                      
                        </TableRow>
                      );
                    })}
                  </TableBody>
              {/* </Paper> */}
            </Table>
          </TableContainer>
        </Box>     
    </Box>
    <div style={{marginTop:'5rem'}}>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
    </div>
  </div>

)}

export default Tablee