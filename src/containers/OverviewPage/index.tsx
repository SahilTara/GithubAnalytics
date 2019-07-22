import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SummaryCard from "../../components/SummaryCard";
import { IIssueData } from "../../types/IIssueData";
import { IPullRequest } from "../../types/IPullRequest";
import SelectableItems from "../../components/SelectableItems";
import { TIME_SPAN } from "../../types/TimeSpan";
import { AppState } from "../../reducers";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setTimeSpanAction } from "../../actions/repositoryInfoActions/setTimeSpan";

interface IProps {
  /**
   * Total number of issues opened
   *
   * @type {number}
   * @memberof IProps
   */
  issuesOpened: number;

  /**
   * Total number of issues closed
   *
   * @type {number}
   * @memberof IProps
   */
  issuesClosed: number;

  /**
   * Total number of PRs opened
   *
   * @type {number}
   * @memberof IProps
   */
  prsOpened: number;

  /**
   * Total number of PRs merged
   *
   * @type {number}
   * @memberof IProps
   */
  prsMerged: number;

  /**
   * Total number of commits made
   *
   * @type {number}
   * @memberof IProps
   */
  commitsMade: number;

  /**
   * Total number of lines added
   *
   * @type {number}
   * @memberof IProps
   */
  linesAdded: number;

  /**
   * Total number of lines deleted
   *
   * @type {number}
   * @memberof IProps
   */
  linesDeleted: number;
}

interface IStateProps {
  timeSpan: TIME_SPAN;
}

interface IDispatchProps {
  setTimeSpan: (timeSpan: TIME_SPAN) => any;
}

type Props = IProps & IStateProps & IDispatchProps;

/**
 * Page for viewing brief overview of stats.
 */
const OverviewPage: React.FC<Props> = ({
  issuesOpened,
  issuesClosed,
  prsOpened,
  prsMerged,
  commitsMade,
  linesAdded,
  linesDeleted,
  timeSpan,
  setTimeSpan
}) => {
  const timeSpans = [
    TIME_SPAN.LAST_7_DAYS,
    TIME_SPAN.LAST_MONTH,
    TIME_SPAN.LAST_YEAR
  ];

  const selectTimeSpan = (key: string) => {
    setTimeSpan(key as TIME_SPAN);
  };

  return (
    <Container>
      <div style={{ paddingTop: "20px" }}>
        {/* Timespan Selector */}
        <Row style={{ paddingBottom: "20px" }}>
          <Col md={{ span: 2, offset: 10 }}>
            <SelectableItems
              options={timeSpans}
              title={timeSpan}
              className=""
              id="time-span"
              onChangeHook={selectTimeSpan}
            />
          </Col>
        </Row>
        {/* Main Content */}
        <Row>
          <Col>
            {/* Summary Cards */}
            <Row>
              <Col>
                <SummaryCard
                  count={issuesOpened}
                  subtitle={"issues opened"}
                  countSecond={issuesClosed}
                  subtitleSecond={"issues closed"}
                />
              </Col>
              <Col>
                <SummaryCard
                  count={prsOpened}
                  subtitle={"PRs opened"}
                  countSecond={prsMerged}
                  subtitleSecond={"PRs Merged"}
                />
              </Col>
              <Col>
                <SummaryCard
                  count={commitsMade}
                  subtitle={"commits made"}
                  afterSubtitle={
                    <div>
                      <hr style={{ width: "80%" }} />
                      <h4>{`${linesAdded} lines added`}</h4>
                      <h4>{`${linesDeleted} lines deleted`}</h4>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const { timeSpan } = state.repositoryInfo;
  return {
    timeSpan
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setTimeSpan: (timeSpan: TIME_SPAN) => {
    dispatch(setTimeSpanAction(timeSpan));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewPage);
