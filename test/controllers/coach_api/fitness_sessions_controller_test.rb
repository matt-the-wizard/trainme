require 'test_helper'

class CoachApi::FitnessSessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get coach_api_fitness_sessions_index_url
    assert_response :success
  end

end
