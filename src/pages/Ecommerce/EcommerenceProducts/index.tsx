import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty, map } from "lodash";

//Import Star Ratings
import StarRatings from "react-star-ratings";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Product Images
import { productImages } from "../../../assets/images/product";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";

//Import data
import { discountData, productsData } from "../../../common/data";

//Import actions
import { getProducts as onGetProducts } from "../../../slices/e-commerence/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';

const EcommerceProducts = (props: any) => {

  //meta title
  document.title = "Products | Skote - React Admin & Dashboard Template";

  const dispatch: any = useDispatch();

 const selectProperties = createSelector(
    (state: any) => state.ecommerce,
    (ecommerce) => ({
      products: ecommerce.products
    })
  );

  const { products } = useSelector(selectProperties);

  const { navigate } = props.router;
  // eslint-disable-next-line no-unused-vars
  const FilterClothes = [
    { id: 1, name: "T-shirts", link: "#" },
    { id: 2, name: "Shirts", link: "#" },
    { id: 3, name: "Jeans", link: "#" },
    { id: 4, name: "Jackets", link: "#" },
  ];

  const [productList, setProductList] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>("1");
  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState<any>([]);
  const [filters, setFilters] = useState({
    discount: [],
    price: { min: 0, max: 500 },
  });
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const totalPage = 5;
  useEffect(() => {
    setProductList(products);
    setDiscountDataList(discountDataList);
  }, [products, discountDataList]);

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onSelectDiscount = (e: any) => {
    const { value, checked } = e.target;
    const { discount } = filters;
    var existing: any = [...discount];
    if (checked) {
      existing = [...discount, value];
      setFilters({
        ...filters,
        discount: existing,
      });
    } else {
      const unCheckedItem = discount.find((item) => item === value);
      if (unCheckedItem) {
        existing = discount.filter((item) => item !== value);
      }
    }
    setFilters({
      ...filters,
      discount: existing,
    });
    // onFilterProducts(value, checked)

    let filteredProducts = productsData;
    if (checked && parseInt(value) === 0) {
      filteredProducts = productsData.filter(
        (product: any) => product.offer < 10
      );
    } else if (checked && existing.length > 0) {
      filteredProducts = productsData.filter(
        (product: any) => product.offer >= Math.min(...existing)
      );
    }
    setProductList(filteredProducts);
  };

  const onUpdate = (render: any, handle: any, value: any) => {
    setProductList(
      productsData.filter(
        (product) =>
          product.newPrice >= value[0] && product.newPrice <= value[1]
      )
    );
  };

  const [ratingvalues, setRatingvalues] = useState<string[]>([]);
  /*
  on change rating checkbox method
  */
  const onChangeRating = (value: any) => {
    setProductList(productsData.filter((product) => product.rating >= value));

    var modifiedRating = [...ratingvalues];
    modifiedRating.push(value);
    setRatingvalues(modifiedRating);
  };

  const onSelectRating = (value: any) => {
    setProductList(productsData.filter((product) => product.rating === value));
  };

  const onUncheckMark = (value: any) => {
    var modifiedRating = [...ratingvalues];
    const modifiedData: any = (modifiedRating || []).filter((x) => x !== value);
    /*
    find min values
    */
    var filteredProducts = productsData;
    if (modifiedData && modifiedData.length && value !== 1) {
      var minValue = Math.min(...modifiedData);
      if (minValue && minValue !== Infinity) {
        filteredProducts = productsData.filter(
          (product) => product.rating >= minValue
        );
        setRatingvalues(modifiedData);
      }
    } else {
      filteredProducts = productsData;
    }
    setProductList(filteredProducts);
  };

  const handlePageClick = (page: any) => {
    setPage(page);
  };

  const handleSearch = (ele: any) => {
    let search = ele.target.value;

    if (search) {
      setProductList(products?.filter((searchData: any) => searchData.name.toLowerCase().includes(search)))
    } else {
      setProductList(products)
    }

  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
          <Row>
            <Col lg={3}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Filter</CardTitle>
                  <div>
                    <h5 className="font-size-14 mb-3">Clothes</h5>
                    {/* Render Cloth Categories */}
                    <ul className="list-unstyled product-list">
                      {FilterClothes.map((cloth, key) => (
                        <li key={"_li_" + key}>
                          <Link to={cloth.link}>
                            <i className="mdi mdi-chevron-right me-2" />
                            {cloth.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Price</h5>
                    <br />

                    <Nouislider
                      range={{ min: 0, max: 600 }}
                      tooltips={true}
                      start={[0, 500]}
                      connect
                      //   tooltipVisible
                      step={10}
                      onSlide={onUpdate}
                    />
                  </div>

                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Discount</h5>
                    {(discountData || []).map((discount: any, i: number) => (
                      <FormGroup check className="mt-2" key={i}>
                        <Input
                          type="checkbox"
                          value={discount.value}
                          //   id={i}
                          onChange={onSelectDiscount}
                        />
                        <Label check>
                          {discount.label}
                        </Label>
                      </FormGroup>
                    ))}
                  </div>

                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Customer Rating</h5>
                    <div>
                      <FormGroup check className="mt-2">
                        <Input
                          type="checkbox"
                          id="productratingCheck1"
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChangeRating(4);
                            } else {
                              onUncheckMark(4);
                            }
                          }}
                        />
                        <Label check
                          htmlFor="productratingCheck1"
                        >
                          4 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </FormGroup>
                      <FormGroup check className="mt-2">
                        <Input
                          type="checkbox"
                          id="productratingCheck2"
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChangeRating(3);
                            } else {
                              onUncheckMark(3);
                            }
                          }}
                        />
                        <Label check
                          htmlFor="productratingCheck2"
                        >
                          3 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </FormGroup>
                      <FormGroup check className="mt-2">
                        <Input
                          type="checkbox"
                          id="productratingCheck3"
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChangeRating(2);
                            } else {
                              onUncheckMark(2);
                            }
                          }}
                        />
                        <Label check
                          htmlFor="productratingCheck3"
                        >
                          2 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </FormGroup>
                      <FormGroup check className="mt-2">
                        <Input
                          type="checkbox"
                          id="productratingCheck4"
                          onChange={(e) => {
                            if (e.target.checked) {
                              onSelectRating(1);
                            } else {
                              onUncheckMark(1);
                            }
                          }}
                        />
                        <Label check
                          htmlFor="productratingCheck4"
                        >
                          1 <i className="bx bx-star text-warning" />
                        </Label>
                      </FormGroup>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={9}>
              <Row className="mb-3">
                <Col xl={4} sm={6}>
                  <div className="mt-2">
                    <h5>Clothes</h5>
                  </div>
                </Col>
                <Col lg={8} sm={6}>
                  <Form className="mt-4 mt-sm-0 float-sm-end d-sm-flex align-items-center">
                    <div className="search-box me-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="border-0"
                          placeholder="Search..."
                          onChange={(e: any) => handleSearch(e)}
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav
                      className="product-view-nav justify-content-end mt-3 mt-sm-0"
                      pills
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          <i className="bx bx-grid-alt" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggleTab("2");
                          }}
                        >
                          <i className="bx bx-list-ul" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
              <Row>
                {!isEmpty(productList) &&
                  (productList || []).map((product: any, key: number) => (
                    <Col xl={4} sm={6} key={"_col_" + key}>
                      <Card
                        onClick={() =>
                          navigate(`/ecommerce-product-detail/${product.id}`)
                        }
                      >
                        <CardBody>
                          <div className="product-img position-relative">
                            {product.isOffer ? (
                              <div className="avatar-sm product-ribbon">
                                <span className="avatar-title rounded-circle bg-primary">
                                  {`- ${product.offer} %`}
                                </span>
                              </div>
                            ) : null}

                            <img
                              src={productImages[product.image]}
                              alt=""
                              className="img-fluid mx-auto d-block"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                              <Link
                                to={"/ecommerce-product-detail/" + product.id}
                                className="text-dark"
                              >
                                {product.name}
                              </Link>
                            </h5>
                            <div className="text-muted mb-3">
                              <StarRatings
                                rating={product.rating}
                                starRatedColor="#F1B44C"
                                starEmptyColor="#74788d"
                                numberOfStars={5}
                                name="rating"
                                starDimension="14px"
                                starSpacing="1px"
                              />
                            </div>
                            <h5 className="my-0">
                              <span className="text-muted me-2">
                                <del>${product.oldPrice}</del>
                              </span>
                              <b>${product.newPrice}</b>
                            </h5>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>

              <Row>
                <Col lg={12}>
                  <Pagination className="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1">
                    <PaginationItem disabled={page === 1}>
                      <PaginationLink
                        previous
                        to="#"
                        onClick={() => handlePageClick(page - 1)}
                      />
                    </PaginationItem>
                    {map(Array(totalPage), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink
                          onClick={() => handlePageClick(i + 1)}
                          to="#"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPage}>
                      <PaginationLink
                        next
                        to="#"
                        onClick={() => handlePageClick(page + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default withRouter(EcommerceProducts);
