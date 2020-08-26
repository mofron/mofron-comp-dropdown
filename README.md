#   mofron-comp-dropdown
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

 dropdown component for mofron


# Install
```
npm install mofron   mofron-comp-dropdown
```

# Sample
```html
<setting>
    <tag load="mofron-comp-dropdown">DropDown</tag>
</setting>

<script run=init>
let chg_evt = (p1,p2,p3) => { console.log(p2); }
</script>

<DropDown changeEvent=@chg_evt size=(1rem,0.5rem) select=1>
[select_1,select_2,select_3]
</DropDown>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | afterRender | ||| ◯  | text | mixed | string:  select text contents |
| | | | array: select text contents list |
| | | | undefined: call as getter |
| | select | number | selected index |
| | | | undefined: call as getter |
| | value | number | the same as select parameter |
| | clear | ||
