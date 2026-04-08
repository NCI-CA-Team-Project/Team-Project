// stats page

//IMPORTS___________________________________________
export default function Stats() {

  // temporary placeholder stats until backend is connected
  const stats = {
    name: "Your Name (STATS DEMO)",
    level: 6,
    recievedTexts: 212,
    sentTexts: 326,
    totalMatches: 18,
    totalRequests: 27,
    recievedPercent: 35,//texts recieved
    sentPercent: 65,//sent etxts
  };

  // fake daily bars = recived+sent texts
 const activityBars = [220, 140, 280, 90, 180, 210, 120];

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="stats-page">
      <div className="stats-container">

        {/* top section of page */}
        <div className="stats-top-card">
          <div className="stats-user-block">
            <div className="stats-avatar-wrap">
              <div className="stats-avatar">👤</div>
            </div>

            <div className="stats-user-text">
              <h2>{stats.name}</h2>
              <p>Level {stats.level}</p>
              <div className="stats-mini-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="stats-divider" />{/*a division between profile and chart*/}

          <div className="stats-chart-block">{/*right side is the pie chart*/}
            <div className="stats-pie" style={{
                  background: `conic-gradient(
                  var(--accent) 0% ${stats.recievedPercent}%,
                  #cfc3ff ${stats.recievedPercent}% 100%
                )`,
              }}
            >
              <div className="stats-pie-center">{/*center of pie chart*/}
                <span>Texts</span>
                <strong>{stats.sentPercent}%</strong>
              </div>
            </div>

            {/*explain th epie chart colors*/}
            <div className="stats-pie-labels">
              <p><span className="dot recieved-dot" /> Recieved Texts</p>
              <p><span className="dot sent-dot" /> Sent Texts</p>
            </div>
          </div>
        </div>


        {/* bottom section */}
        <div className="stats-bottom-grid">
          {/*weekly bar chart*/}
          <div className="stats-bar-card">
            <h3>Weekly Activity</h3>

          <div className="stats-bars">
            {activityBars.map((height, index) => (
              <div key={index} className="stats-bar-column">
                <div
                  style={{
                    width: "100%",
                    height: `${height}px`,
                    background: "var(--accent)",
                    borderRadius: "12px 12px 0 0",
                  }}
                />
              </div>
            ))}
          </div>
          </div>

          {/*sumarry cards*/}
          <div className="stats-summary-column">
            <div className="stats-summary-card">
              <h4>Total Recieved texts</h4>
              <p>{stats.recievedTexts}</p>
            </div>

            <div className="stats-summary-card">
              <h4>Total Sent Texts</h4>
              <p>{stats.sentTexts}</p>
            </div>

            <div className="stats-summary-card">
              <h4>Total Matches</h4>
              <p>{stats.totalMatches}</p>
            </div>

            <div className="stats-summary-card">
              <h4>Total Requests</h4>
              <p>{stats.totalRequests}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}