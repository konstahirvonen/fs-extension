import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Typography } from "@mui/material"

const Users = () => {


    return (
        <div>
            <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 1 }}>Users</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Users