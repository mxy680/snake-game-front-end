import React, { useState, useEffect } from 'react';
import { usePlayer } from '../PlayerContext'; 
import { useNavigate } from 'react-router-dom';
import './styles/Settings.css';

const Settings = () => {
  const { settings, updateSettings } = usePlayer();
  const [localSettings, setLocalSettings] = useState(settings);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings({ ...localSettings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(localSettings);
    navigate('/menu');
  };

  const goHome = () => {
    navigate('/menu'); // Navigate to the home route (adjust the route as needed)
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h2 className="settings-title">Game Settings</h2>
        <form onSubmit={handleSubmit} className="settings-form">
          {/* Snake Color */}
          <div className="settings-field">
            <label htmlFor="snakeColor" className="settings-label">Snake Color:</label>
            <input
              type="text"
              id="snakeColor"
              name="snakeColor"
              className="settings-input"
              value={localSettings.snakeColor || ''}
              onChange={handleChange}
            />
          </div>

          {/* Food Color */}
          <div className="settings-field">
            <label htmlFor="foodColor" className="settings-label">Food Color:</label>
            <input
              type="text"
              id="foodColor"
              name="foodColor"
              className="settings-input"
              value={localSettings.foodColor || ''}
              onChange={handleChange}
            />
          </div>

          {/* Background Color */}
          <div className="settings-field">
            <label htmlFor="backgroundColor" className="settings-label">Background Color:</label>
            <input
              type="text"
              id="backgroundColor"
              name="backgroundColor"
              className="settings-input"
              value={localSettings.backgroundColor || ''}
              onChange={handleChange}
            />
          </div>

          {/* Snake Speed */}
          <div className="settings-field">
            <label htmlFor="snakeSpeed" className="settings-label">Snake Speed:</label>
            <input
              type="number"
              id="snakeSpeed"
              name="snakeSpeed"
              className="settings-input"
              value={localSettings.snakeSpeed || ''}
              onChange={handleChange}
            />
          </div>


          {/* Buttons */}
          <div className="settings-actions">
            <button type="submit" className="settings-save">Save Settings</button>
            <button onClick={goHome} className="settings-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
