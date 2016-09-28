cd public\stylesheets

FOR /L %%A IN (1,0,200) DO (
    lessc style.less > style.css
    timeout /t 30
)