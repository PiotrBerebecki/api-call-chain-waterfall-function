test('hello test', assert => {
  assert.ok(1 == "1");
});

test('handleLocation', assert => {
  const fakeObj = {};
  const fakeResponseText = '{"city":"London","location":{"latitude":50.1,"longitude":-0.18}}';
  const expected = {
    city: 'London',
    latitude: 50.1,
    longitude: -0.18
  };
  assert.deepEqual(handleLocation(fakeObj, fakeResponseText), expected);
});


test('makeRequest', assert => {
  const done = assert.async();

  makeRequest('https://geoip.nekudo.com/api/', function(err, responseText) {
    assert.ok(typeof responseText == 'string', 'receives response text');
    done();
  });
});
