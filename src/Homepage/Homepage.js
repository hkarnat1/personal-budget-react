import axios from 'axios';
import React from 'react';
import * as d3 from 'd3';
import { Chart } from 'chart.js/auto';

function Homepage() {
    var dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                ]
            }
        ],
        labels: []
    };
    var svg;
    var margin = 50;
    var width = 500;
    var height = 500;
    // The radius of the pie chart is half the smallest side
    var radius = Math.min(width, height) / 2 - margin;
    var colors;
    var data;
    const chartId = React.useRef(null);

    function createChart(dataSource) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
    }

    function getBudget() {
        axios.get('http://localhost:3000/budget')
        .then(function (res) {
            if(!data){

            data = res.data.myBudget;
            createSvg();
            createColors();
            drawChart();

            for (var i = 0; i < res.data.myBudget.length; i++) {
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.labels[i] = res.data.myBudget[i].title
            }

                createChart(dataSource);
            }
        });
    }

    function createSvg() {
        svg = d3
          .select("figure#pie")
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr(
            'transform',
            'translate(' + width / 2 + ',' + height / 2 + ')'
          );
      }
    
    function createColors() {
        colors = d3
          .scaleOrdinal()
          .domain(data.map((d) => d.budget.toString()))
          .range(dataSource.datasets[0].backgroundColor);
      }
    
      function drawChart() {
        // Compute the position of each group on the pie:
        const pie = d3.pie().value((d) => Number(d.budget));
    
    
        // Build the pie chart
        svg
          .selectAll('pieces')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
          .attr('fill', (d, i) => colors(i))
          .attr('stroke', '#FFFFFF')
          .style('stroke-width', '1px');
    
        // Add labels
        const labelLocation = d3.arc().innerRadius(100).outerRadius(radius);
    
        svg
          .selectAll('pieces')
          .data(pie(data))
          .enter()
          .append('text')
          .text((d) => d.data.title)
          .attr(
            'transform',
            (d) => 'translate(' + labelLocation.centroid(d) + ')'
          )
          .style('text-anchor', 'middle')
          .style('font-size', 15);
      }
    

    React.useEffect(() => {
        if(!chartId.current !== null){
            getBudget();
        }

    }, [])



  return (
    <main className="center" id="main">

        <div className="page-area">

            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Chart</h1>
                    <canvas ref={chartId} id="myChart" width="400" height="400"></canvas>
                    <figure id="pie"></figure>

            </article>

        </div>

    </main>
  );
}

export default Homepage;
