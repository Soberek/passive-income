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

interface ContactTableProps {
  contacts: Contact[];
  error?: Error | null;
  loading?: boolean;
}

const ContactsTable = ({ contacts, error, loading }: ContactTableProps) => {
  if (loading) {
    return <div>Ładowanie kontaktów...</div>;
  }
  if (error) {
    return <div>Błąd podczas ładowania kontaktów: {error.message}</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Imię</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Nazwisko</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Telefon</TableSortLabel>
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
              count={50}
              rowsPerPage={5}
              page={0}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
