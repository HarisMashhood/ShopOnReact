import React from 'react'
import { Container, FormControl, Nav, Navbar, Dropdown, Button } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { FaShoppingCart } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'
import Badge from 'react-bootstrap/Badge';
import './styles.css'
const Header = () => {
    const { state: { cart },
        dispatch,
        productDispatch
    } = CartState()
    return (
        <Navbar style={{ height: 80, display: "flex", backgroundColor: "#9799b4" }}>
            <Container>
                <Navbar.Brand style={{ fontWeight: "bold", color: "white" }}>
                    <Link to="/">ZEVE Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl style={{ width: 500, backgroundColor: "#e3e1dd", color: "grey" }} placeholder="Search a Product" className='m-auto'
                        onChange={(e) => {
                            productDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value,
                            })
                        }} />
                </Navbar.Text>
                <Nav>
                    <Dropdown alignright="true">
                        <Dropdown.Toggle variant="secondary">
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge bg="secondary">
                                {cart.length}
                            </Badge>

                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {
                                cart.length > 0 ? (
                                    <>
                                        {
                                            cart.map((prod) => (
                                                <span className='cartitem' key={prod.id}>
                                                    <img src={prod.image} alt={prod.name} className='cartItemImg' />
                                                    <div className='cartItemDetail'>
                                                        <span>{prod.name}</span>
                                                        <span>Rs. {prod.price.split(".")[0]}</span>
                                                    </div>
                                                    <AiFillDelete fontSize="20px" style={{ cursor: "pointer" }}
                                                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })
                                                        } />
                                                </span>
                                            ))
                                        }
                                        <Link to="/cart">
                                            <Button variant='secondary' style={{ width: "95%", margin: "0 10px" }}>
                                                Go To Cart
                                            </Button>
                                        </Link>
                                    </>
                                ) : (<span style={{ padding: "10px" }}>Cart is Empty</span>)
                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header