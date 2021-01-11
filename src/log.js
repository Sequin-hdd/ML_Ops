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
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#80e27e',
            main: '#4caf50',
            dark: '#087f23',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
        },
    },
});


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
    paperRoot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
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

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;



function ChipsArray() {
    const classes = useStyles();
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <ThemeProvider theme={theme}>
        <Paper component="ul" className={classes.paperRoot} variant="outlined">
            {chipData.map((data) => {


                return (
                    <li key={data.key}>
                    <Tooltip
                        arrow
                        title={
                            <React.Fragment>
                                <Typography color="inherit">Tooltip with HTML</Typography>
                                <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                {"It's very engaging. Right?"}
                            </React.Fragment>
                        }
                             classes={{ tooltip: classes.customWidth }} placement="top">
                        <Chip
                            label={data.label}
                            // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            onClick={handleClickOpen('paper')}
                            deleteIcon={<DoneIcon />}
                            onDelete={handleDelete}
                            className={classes.chip}
                            clickable
                            color="primary"
                        />
                    </Tooltip>
                    </li>
                );
            })}
        </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
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
                        <Box margin={5}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tasks
                            </Typography>
                            <ChipsArray />
                            <Table size="small" aria-label="purchases" style={{marginTop:"20px"}}>
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
                                <Row dag={customer}/>
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
