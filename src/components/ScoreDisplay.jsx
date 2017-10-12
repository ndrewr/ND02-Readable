// @flow

import React from 'react';
import {
  Button,
  Icon,
  Statistic,
} from 'semantic-ui-react'

// type CommentItem = {
//   voteScore?: number,
//   body?: string,
//   id: string,
//   timestamp: number,
//   author?: string,
// };

const voteButtonStyles = {
  backgroundColor: 'transparent',
  display: 'block',
  width: '100%',
  padding: 0,
  paddingLeft: '1.5em',
  textAlign: 'center',
}

const scoreStyles = {
  margin: 0,
}

const ScoreDisplay = ({ score, updateScore }: { score: number, updateScore: (any) => void }) => (
  <div>
    <Button animated style={voteButtonStyles} onClick={updateScore}>
      <Button.Content visible>
        <Icon name='triangle up' size="big" />
      </Button.Content>
      <Button.Content hidden>
        vote up
      </Button.Content>
    </Button>
    <Statistic size="large" style={scoreStyles}>
      <Statistic.Value>
        { score }
      </Statistic.Value>
    </Statistic>
    <Button animated style={voteButtonStyles} onClick={updateScore}>
      <Button.Content visible>
        <Icon name='triangle down' size="big" />
      </Button.Content>
      <Button.Content hidden>
        vote down
      </Button.Content>
    </Button>
  </div>
)

export default ScoreDisplay
