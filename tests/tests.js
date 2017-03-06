test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

test('does avatar image exist', function(assert){
  var done = assert.async();
  setTimeout(function() {
    assert.equal(imgDOM.src, 'https://avatars1.githubusercontent.com/u/17753038?v=3');
    done();
  }, 3000);

});

test('is Number of repos returning a number', function(assert){
  var done = assert.async();
  setTimeout(function() {
    assert.equal(typeof Number(repoNumberDOM.textContent), 'number');
    done();
  }, 3000);
});

test( 'is getLang returning a string', function(assert) {
  var fakeRepos = [{language: 'HTML'}, {language: 'CSS'}]
  assert.equal(getLang(fakeRepos), 'HTML CSS');
});
