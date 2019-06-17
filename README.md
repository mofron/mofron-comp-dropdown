# mofron-comp-dropdown

[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

dropdown component for [mofron](https://mofron.github.io/mofron/).

# Install

```:bash
npm install mofron mofron-comp-dropdown
```

# Sample
```html
<require>
    <tag module="mofron-comp-dropdown">DropDown</tag>
</require>

<script run=init>
let evt = (p1,p2,p3) => { console.log(p2); };
</script>

<DropDown changeEvent=evt size="1rem","0.5rem" select=1>
    <text>test 1</text>
    <text>test 2</text>
    <text>test 3</text>
</DropDown>
```

# Parameter

| Simple<br>Param | Parameter Name     | Type                  |    Description                         |
|:---------------:|:-------------------|:----------------------|:---------------------------------------|
|      ◯          | text               | string/array          | select text contents                   |
|                 | value              | number                | select index                           |
|                 | select             | number                | same as 'value'                        |

