import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Typography } from "@mui/material"
import { useUserActions, useUsers } from "../store"
import { useEffect } from "react"
import { Link, useMatch, } from "react-router-dom";

const Users = () => {

    const users = useUsers()
    const { initializeAllUsers } = useUserActions()

    const match = useMatch("/users/:id");
    const user = match ? users.find((user) => user.id === match.params.id) : null;

    useEffect(() => {
        initializeAllUsers()
    }, [initializeAllUsers])

    if (match) {
        if (!user) {
            return <Typography>User not found</Typography>
        }
        return (
            <div>
                <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 1 }}>{user.name}</Typography>
                <Typography variant="h6">added blogs</Typography>
                <ul>
                    {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                    ))}
                </ul>
            </div>
        )
    }

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
                        {users.map((user) => (
                            <TableRow key={user.id} >
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Users