import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './List.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      property: [],
      response: {},
    };
  }

  componentDidMount() {
    const apiUrl = 'http://43.204.24.76:4000/api/property/get';

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            property: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  deleteProperty(propertyId) {
    const { property } = this.state;

    const apiUrl = `http://43.204.24.76:4000/api/property/delete/${propertyId}`;
    const formData = new FormData();
    formData.append('propertyId', propertyId);

    const options = {
      method: 'DELETE',
      body: formData,
    };

    fetch(apiUrl, options)
      .then((res) => console.log(res))
      .then(
        (result) => {
          this.setState({
            response: result,
            property: property.filter((property) => property.id !== propertyId),
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
    window.location.reload();
  }

  render() {
    const { error, property } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <h2>Property List</h2>
          {this.state.response.message && (
            <Alert variant='info'>{this.state.response.message}</Alert>
          )}
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Property Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {property.map((property) => (
                <tr key={property._id}>
                  <td>{property._id}</td>
                  <td>{property.title}</td>
                  <td>{property.price}</td>
                  <td>
                    <Link to={`/update/${property._id}`}>
                      <Button
                        variant='info'
                        // onClick={() => this.props.editProperty(property._id)}
                      >
                        Edit
                      </Button>
                    </Link>
                    &nbsp;
                    <Button
                      variant='danger'
                      onClick={() => this.deleteProperty(property._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default List;

// https://vrtour-sih.herokuapp.com/api/property/update/:propertyid
// https://vrtour-sih.herokuapp.com/api/property/delete/:propertyid
// https://vrtour-sih.herokuapp.com/api/property/getpropertydetails/:id
// https://vrtour-sih.herokuapp.com/api/property/get
