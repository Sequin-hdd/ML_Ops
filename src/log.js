import React, { useState } from 'react';
import {
    Avatar,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Box,
    Container,
    Button,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    makeStyles
} from '@material-ui/core';
import data from './data';
import { Search as SearchIcon } from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
import getInitials from './getInitials';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        minHeight: '100%',
        paddingBottom: theme.spacing(5),
        paddingTop: theme.spacing(3),
        margin: theme.spacing(0)
    },
    // importButton: {
    //     marginRight: theme.spacing(1)
    // },
    // exportButton: {
    //     marginRight: theme.spacing(1)
    // },
    avatar: {
        marginRight: theme.spacing(2)
    },
    tableRow: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
}));



function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}


function Row(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const dag =  props.dag;

    return (
        <React.Fragment>
            <TableRow
                className={classes.tableRow}
                hover
                key={dag.id}
            >
                {/*<TableCell padding="checkbox">*/}
                {/*    <Checkbox*/}
                {/*        checked={selectedCustomerIds.indexOf(customer.id) !== -1}*/}
                {/*        onChange={(event) => handleSelectOne(event, customer.id)}*/}
                {/*        value="true"*/}
                {/*    />*/}
                {/*</TableCell>*/}
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Box
                        alignItems="center"
                        display="flex"
                    >
                        <Avatar
                            className={classes.avatar}
                            src={dag.avatarUrl}
                        >
                            {getInitials(dag.name)}
                        </Avatar>
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {dag.name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    {dag.email}
                </TableCell>
                <TableCell>
                    {`${dag.address.city}, ${dag.address.state}, ${dag.address.country}`}
                </TableCell>
                <TableCell>
                    {dag.phone}
                </TableCell>
                <TableCell>
                    {moment(dag.createdAt).format('DD/MM/YYYY')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tasks
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/*{row.history.map((historyRow) => (*/}
                                    {/*    <TableRow key={historyRow.date}>*/}
                                    {/*        <TableCell component="th" scope="row">*/}
                                    {/*            {historyRow.date}*/}
                                    {/*        </TableCell>*/}
                                    {/*        <TableCell>{historyRow.customerId}</TableCell>*/}
                                    {/*        <TableCell align="right">{historyRow.amount}</TableCell>*/}
                                    {/*        <TableCell align="right">*/}
                                    {/*            {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                                    {/*        </TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    // row: PropTypes.shape({
    //     calories: PropTypes.number.isRequired,
    //     carbs: PropTypes.number.isRequired,
    //     fat: PropTypes.number.isRequired,
    //     history: PropTypes.arrayOf(
    //         PropTypes.shape({
    //             amount: PropTypes.number.isRequired,
    //             customerId: PropTypes.string.isRequired,
    //             date: PropTypes.string.isRequired,
    //         }),
    //     ).isRequired,
    //     name: PropTypes.string.isRequired,
    //     price: PropTypes.number.isRequired,
    //     protein: PropTypes.number.isRequired,
    // }).isRequired,
    dag :PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired
};



const Results = ({ className, customers, ...rest }) => {


    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);



    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };


    return (
        <Card
            {...rest}
        >
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/*<TableCell padding="checkbox">*/}
                                {/*    <Checkbox*/}
                                {/*        checked={selectedCustomerIds.length === customers.length}*/}
                                {/*        color="primary"*/}
                                {/*        indeterminate={*/}
                                {/*            selectedCustomerIds.length > 0*/}
                                {/*            && selectedCustomerIds.length < customers.length*/}
                                {/*        }*/}
                                {/*        onChange={handleSelectAll}*/}
                                {/*    />*/}
                                {/*</TableCell>*/}
                                <TableCell />
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Location
                                </TableCell>
                                <TableCell>
                                    Phone
                                </TableCell>
                                <TableCell>
                                    Registration date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(0, limit).map((customer) => (
                                <Row customer={customer}/>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            <TablePagination
                component="div"
                count={customers.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array.isRequired
};



const Toolbar = ({ className, ...rest }) => {

    return (
        <div
            {...rest}
        >
            {/*<Box*/}
            {/*    display="flex"*/}
            {/*    justifyContent="flex-end"*/}
            {/*>*/}
            {/*    <Button className={classes.importButton}>*/}
            {/*        Import*/}
            {/*    </Button>*/}
            {/*    <Button className={classes.exportButton}>*/}
            {/*        Export*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        color="primary"*/}
            {/*        variant="contained"*/}
            {/*    >*/}
            {/*        Add customer*/}
            {/*    </Button>*/}
            {/*</Box>*/}
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Box maxWidth='100%'>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                fontSize="small"
                                                color="action"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="Search DAG Log"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string
};




const CustomerListView = () => {
    const classes = useStyles();
    const [customers] = useState(data);

    return (
        <div className={classes.root}>
            <Container maxWidth={false}>
                <Toolbar />
                <Box mt={3}>
                    <Results customers={customers} />
                </Box>
            </Container>
        </div>
    );
};

export default CustomerListView;
