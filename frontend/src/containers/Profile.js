/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { AllCall } from '../helpers/apiCalls';
import style from '../style/Profile.module.css';

const Profile = ({ getAllProfiles }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProfiles('profile');
        if (data && data.length > 0) {
          setUser(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAllProfiles]);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100">
        <Spinner animation="grow" />
      </div>
    );
  }

  const {
    firstname = 'User',
    lastname = '',
    email,
    dob,
    country,
    city,
    gender,
    work_status,
    phone,
    avatar,
    about,
    socialMedia = {},
  } = user;

  const githubLink = socialMedia.Github || '#';
  const angelLink = socialMedia.Angelist || '#';
  const linkedinLink = socialMedia.Linkedin || '#';

  return (
    <div className={`container-fluid ${style.bggrey}`}>
      <div className="row">
        {/* Left Navigation Panel */}
        <div className={`${style.profilenav} col-md-3`}>
          <div className={style.panel}>
            <div className={`${style.userheading} round`}>
              <a href="#">
                <img
                  src={avatar || 'http://localhost:8000/public/images/placeholder.png'}
                  alt={`${firstname}'s avatar`}
                />
              </a>
              <h1 className="mt-2">
                {firstname} {lastname}
              </h1>
              <p className="text-white">{email}</p>
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github" /> Github
                </a>
              </li>
              <li className="list-group-item">
                <a href={angelLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-angellist" /> Angelist
                </a>
              </li>
              <li className="list-group-item">
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin" /> Linkedin
                </a>
              </li>
              <li className="list-group-item">
                <Link
                  to="/profile/update"
                  state={{ user }}
                  id="list-home-list"
                  data-toggle="list"
                  role="tab"
                  aria-controls="home"
                >
                  <i className="fas fa-user-edit" /> Edit Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className={`${style.profileinfo} col-md-9`}>
          <div className={style.panel}>
            <div className={style.biographheading}>
              {about || 'No bio added.'}
            </div>

            <div className={style.biographinfo}>
              <h1>BioGraphy</h1>
              <div className="row">
                {[
                  { label: 'Name', value: `${firstname} ${lastname}` },
                  { label: 'Birthday', value: dob ? dob.substring(0, 10) : 'N/A' },
                  { label: 'Country', value: country },
                  { label: 'City', value: city },
                  { label: 'Email', value: email },
                  { label: 'Gender', value: gender },
                  { label: 'Work Status', value: work_status },
                  { label: 'Phone', value: phone },
                ].map((item, i) => (
                  <div className={style.biorow} key={i}>
                    <p>
                      <span>{item.label}</span> {item.value || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div>
            <div className={style.biographinfo}>
              <h1 className={`${style.skillsheader} mb-4`}>Highlights</h1>
              <div className="row">
                {[
                  {
                    title: 'Customers',
                    icon: 'fas fa-users',
                    count: 263,
                    percent: '9.23%',
                    theme: style.lbgbluedark,
                  },
                  {
                    title: 'New Collaborations',
                    icon: 'fas fa-compress-arrows-alt',
                    count: 145,
                    percent: '12.5%',
                    theme: style.lbgcherry,
                  },
                  {
                    title: 'Git Commits',
                    icon: 'fas fa-ticket-alt',
                    count: 1578,
                    percent: '10%',
                    theme: style.lbggreendark,
                  },
                  {
                    title: 'Customer Satisfaction',
                    icon: 'far fa-smile-beam',
                    count: '98%',
                    percent: '2.5%',
                    theme: style.lbgorangedark,
                  },
                ].map((card, i) => (
                  <div className="col-md-6" key={i}>
                    <div className={`card ${style.card2} ${card.theme}`}>
                      <div className={`${style.cardstatistic3} p-4`}>
                        <div className={`${style.cardicon} ${style.cardiconlarge}`}>
                          <i className={`${card.icon} fa-8x`} />
                        </div>
                        <div className={style.mb5}>
                          <div className={style.cardtitle}>{card.title}</div>
                          <div className={style.cardstatistic3}>
                            <div className={style.cardnumber}>
                              {card.count}
                            </div>
                            <div className={style.cardright}>
                              <span>
                                {card.percent}{' '}
                                <i className="fa fa-arrow-up" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* row end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllProfiles: AllCall }, dispatch);

export default connect(null, mapDispatchToProps)(Profile);
