import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import HorizontalBarChart from '../components/HorizontalBarChart';
import DonutChart from '../components/DonutChart';
import { AllCall } from '../helpers/apiCalls';
import style from '../style/Home.module.css';

function Home(props) {
  const { getAll } = props;
  const [featured, setFeatured] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAll('projects');
        const data2 = await getAll('stacks');
        setStacks(data2);
        setProjects(data);
        setFeatured(data.sort(() => .5 - Math.random()).slice(0, 2));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getAll]);

  return (!projects || projects.length === 0 || !stacks || stacks.length === 0) ? (
    <div className="d-flex justify-content-center align-items-center w-100">
      <Spinner animation="grow" />
    </div>
  ) : (
    <div className={`${style.greybg} container-fluid`}>
      <section id="minimal-statistics">
        <div className="row">
          <div className="col-12 mt-3 mb-1">
            <h2 className="text-uppercase text-muted">Dashboard</h2>
            <p>Dashboard Statistics</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12"> 
            <div className={`${style.card2} card`}>
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="fas fa-project-diagram fa-2x text-primary" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{projects.length}</h3>
                      <span>Total Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className={`${style.card2} card`}>
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="fas fa-laptop-code fa-2x text-info" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{stacks.length}</h3>
                      <span>Technologies Used</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Add more cards as needed */}
        </div>

        <div className="row">
          <div className="col-8 mt-3 mb-1">
            <HorizontalBarChart stacks={stacks} projects={projects} />
          </div>
          <div className="col-4 mt-3 mb-1">
            <DonutChart projects={projects} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-3 mb-1">
            <h4 className="text-uppercase text-muted">Featured Projects</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-2">
            <div id={style.moviecardlist}>
              {featured.map(project => (        
                <div key={project._id} className={`${style.card2} card`}>
                  <div className="card-content">
                    <div className="card-body">
                      <h5>{project.name}</h5>
                      <p>{project.description}</p>
                      <Link to={`/project/${project._id}`}>View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Home.propTypes = {
  getAll: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: AllCall,
}, dispatch);

export default connect(null, mapDispatchToProps)(Home);

