import React, { Component } from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

class ListRecipients extends Component {
  render() {
    return (
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>No.</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Account number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>
              <Header as='h4' image>
                <Image
                  src='https://react.semantic-ui.com/images/avatar/small/lena.png'
                  rounded
                  size='mini'
                />
                <Header.Content>
                  Lena
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>2242342342342324234234</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>15</Table.Cell>
            <Table.Cell>
              <Header as='h4' image>
                <Image
                  src='https://react.semantic-ui.com/images/avatar/small/matthew.png'
                  rounded
                  size='mini'
                />
                <Header.Content>
                  Matthew
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>1523423423423423423</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>
              <Header as='h4' image>
                <Image
                  src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'
                  rounded
                  size='mini'
                />
                <Header.Content>
                  Lindsay
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>1267567567657</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>11</Table.Cell>
            <Table.Cell>
              <Header as='h4' image>
                <Image
                  src='https://react.semantic-ui.com/images/avatar/small/mark.png'
                  rounded
                  size='mini'
                />
                <Header.Content>
                  Mark
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>11655646456456</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

export default ListRecipients
