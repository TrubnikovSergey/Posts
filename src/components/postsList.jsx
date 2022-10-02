import React from "react"
// import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const PostsList = ({ items, header, children }) => {
    console.log(children)
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-uppercase color1 mb-3">
                            {header}
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div
                            className="accordion accordion-flush"
                            id="accordion1"
                        >
                            {items.map((item) => (
                                <div className="accordion-item" key={item.id}>
                                    <h2
                                        className="accordion-header"
                                        id={`flush-heading${item.id}`}
                                    >
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#flush-collapse${item.id}`}
                                            aria-expanded="false"
                                            aria-controls={`flush-collapse${item.id}`}
                                        >
                                            {item.title}
                                        </button>
                                    </h2>
                                    <div
                                        id={`flush-collapse${item.id}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`flush-heading${item.id}`}
                                        data-bs-parent="#accordion1"
                                    >
                                        <div className="accordion-body">
                                            {item.body}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

PostsList.propTypes = {
    items: PropTypes.array,
    header: PropTypes.string,
    children: PropTypes.array
}

export default PostsList

/* <div className="accordion accordion-flush" id="accordion1">
<div className="accordion-item">
  <h2 className="accordion-header" id="flush-headingOne">
    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
    {item.title}
    </button>
  </h2>
  <div id="flush-collapseOne" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordion1">
    <div className="accordion-body">Краткий обзор того, что мы будем изучать в данном видео курсе.</div>
  </div>
</div>
</div> */
