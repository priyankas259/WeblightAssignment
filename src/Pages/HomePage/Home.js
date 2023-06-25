import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, Typography, Box, Stack, Pagination, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from '../../Redux/Saga/SagaActions';
import HighChart from '../../Component/Common/HighChart';
import { getDateFromTimeStamp } from '../../utility';
import MultiLineHighChart from '../../Component/Common/MultilineHighChart';


const Home = () => {
    const dispatch = useDispatch();
    const { userData, userIsLoading } = useSelector(state => state.user);
    const { CommitActivityData, isLoading } = useSelector(state => state.CommitActivity);
    const { ContributorData, ContributorIsLoading } = useSelector(state => state.Contributor);
    const AddData = useSelector(state => state.AddDelete.AddDeleteData);

    const [repoData, setRepoData] = useState(userData);
    const [page, setPage] = useState(1);
    const [openAccordationId, setOpenAccordationId] = useState(null);
    
    useEffect(() => {
        dispatch({ type: sagaActions.FETCH_DATA_SAGA, payload: 1 })
    }, [dispatch])

    useEffect(() => {
        setRepoData(userData)
    }, [userData])

    const handlePagination = (e, value) => {
        setPage(value)
        dispatch({ type: sagaActions.FETCH_DATA_SAGA, payload: value })
    }

    useEffect(() => {
        const TempData = [];
        const TempSeries = [];
        const TempAddYAxis = [];
        const TempAddXaxis = [];
        const TempDeleteYaxis = [];
        const TempContributorXaxis = [];
        const TempContributorYaxis = [];
        let TempRepoData = repoData;
        if (CommitActivityData.length > 0) {
            CommitActivityData.forEach((activityData) => {
                TempData.push(getDateFromTimeStamp(activityData.week))
                TempSeries.push(activityData.total)
            });
            let TempRepoItems = [...TempRepoData?.items];
            TempRepoItems[openAccordationId] = { ...TempRepoItems[openAccordationId], commitActivityXData: TempData, commitActivityYData: TempSeries }
            TempRepoData = { ...TempRepoData, items: TempRepoItems }
            setRepoData(TempRepoData);
        }
        if (AddData.length > 0) {
            AddData.forEach((activityData) => {
                TempAddYAxis.push(activityData[1]);
                TempAddXaxis.push(getDateFromTimeStamp(activityData[0]));
                TempDeleteYaxis.push(activityData[2]);
            });
            let TempRepoItems = [...TempRepoData?.items];
            TempRepoItems[openAccordationId] = {
                ...TempRepoItems[openAccordationId], additionYAxisData: TempAddYAxis, deletionYAxisData: TempDeleteYaxis,
                additionDeltionXAxisData: TempAddXaxis
            }
            TempRepoData = { ...TempRepoData, items: TempRepoItems }
            setRepoData(TempRepoData);
        }
        if (ContributorData.length > 0) {
            ContributorData.forEach((activityData, index) => {
                const weekdays = [];
                const weekdata = [];
                activityData.weeks.forEach((weekData) => {
                    weekdays.push(getDateFromTimeStamp(weekData.w));
                    weekdata.push(weekData.a + weekData.d + weekData.c);
                });
                TempContributorXaxis.push(weekdays);
                TempContributorYaxis.push({ name: `Contributor${index + 1}`, data: weekdata });
            });
            let TempRepoItems = [...TempRepoData?.items];
            TempRepoItems[openAccordationId] = {
                ...TempRepoItems[openAccordationId], ContributorYaxisData: TempContributorYaxis,
                ContributorXaxisData: TempContributorXaxis
            }
            TempRepoData = { ...TempRepoData, items: TempRepoItems }
            setRepoData(TempRepoData);
        }
    }, [CommitActivityData, AddData, ContributorData])

    const handleChange = (e, user) => {
        let TempRepoData = repoData;
        let TempRepoItems = [...TempRepoData.items];
        TempRepoItems[openAccordationId] = {
            ...TempRepoItems[openAccordationId], selectedDropdownValue: e.target.value
        }
        TempRepoData = { ...TempRepoData, items: TempRepoItems }
        setRepoData(TempRepoData);
        if (e.target.value === 'Commit') {
            dispatch({ type: sagaActions.FETCH_COMMIT_ACTIVITY, payload: { owner: user.owner.login, repo: user.name } })
        }
    }
    const onAccordationChange = (e, expanded, user, id) => {
        setOpenAccordationId(id);
        if (expanded) {
            dispatch({ type: sagaActions.FETCH_CODE_FREQ, payload: { owner: user.owner.login, repo: user.name } })
            dispatch({ type: sagaActions.CONTRIBUTOR_REQ, payload: { owner: user.owner.login, repo: user.name } })
        }
    }
    return (
        <div className='Container'>
            <h1>Most Starrted Repos</h1>
            {repoData?.items?.map((user, id) => {
                return (
                    <Accordion key={id} onChange={(e, expanded) => onAccordationChange(e, expanded, user, id)}
                        sx={{
                            width:
                            {
                                xs: 0,
                                sm: 600,
                                md: 900,
                                lg: 1200,
                                xl: 1536
                            },
                            m: 4,
                            marginInlineStart: 10
                        }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Avatar variant='square' sx={{ height: '120px', width: '120px' }} src={user.owner.avatar_url} />
                            <Grid>
                                <Typography variant="h4" align='left' marginLeft={2}>{user.name}</Typography>
                                <Typography align='left' marginLeft={2}>{user.description}</Typography>
                                <Grid direction='row' container spacing={0}>
                                    <Box sx={{ p: 1, border: 1, width: [100], m: 2 }}> Nb Stars:{user.stargazers_count}</Box>
                                    <Box sx={{ p: 1, border: 1, width: [100], m: 2 }}>Nb Issues:{user.open_issues_count}</Box>
                                    <Typography marginTop={3} marginLeft={7}>Last push {user.updated_at} by {user.owner.login}</Typography>
                                </Grid>
                            </Grid>


                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Box sx={{ border: 1, minWidth: [120], m: 2, float: "right" }}>
                                    <FormControl fullWidth>
                                        <Select onChange={(e) => handleChange(e, user)} placeholder='select'>
                                            <MenuItem value="Commit">Commits</MenuItem>
                                            <MenuItem value="Addition">Addition</MenuItem>
                                            <MenuItem value="Deletion">Deletion</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Typography>
                            {user.selectedDropdownValue === 'Commit' &&
                                <HighChart
                                    xAxisData={user.commitActivityXData}
                                    seriesData={user.commitActivityYData}
                                    chartTitle='Total Commit Changes'
                                />
                            }
                            {user.selectedDropdownValue === 'Addition' &&
                                <HighChart
                                    xAxisData={user.additionDeltionXAxisData}
                                    seriesData={user.additionYAxisData}
                                    chartTitle='Total Addition Changes'
                                />
                            }
                            {user.selectedDropdownValue === 'Deletion' &&
                                <HighChart
                                    xAxisData={user.additionDeltionXAxisData}
                                    seriesData={user.deletionYAxisData}
                                    chartTitle='Total deletion Changes'
                                />
                            }
                            <MultiLineHighChart
                                seriesData={user.ContributorYaxisData}
                                xAxisData={user.ContributorXaxisData?.[0]}
                            />
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            <Stack>
                <Pagination count={34} onChange={handlePagination} page={page} />
            </Stack>
        </div>

    )
}

export default Home;