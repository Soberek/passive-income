import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { Contact } from "../../../../shared/types";

interface ContactsTableProps {
  contacts: Contact[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
}

const ContactsTable = ({
  contacts,
  onPageChange,
  onRowsPerPageChange,
  page,
  rowsPerPage,
  totalCount,
}: ContactsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>First Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Last Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Phone</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.length > 0 &&
            contacts.map((contact) => (
              <TableRow key={contact.contactId}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
